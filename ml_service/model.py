import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

class ResumeScreeningModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=10000, ngram_range=(1, 3), sublinear_tf=True)
        self.svd = TruncatedSVD(n_components=100, random_state=42)
        self.model = RandomForestRegressor(random_state=42)
        self.is_trained = False

    def train(self, df):
        """
        Trains the model using resume_text and job_text to predict matched_score.
        Uses SVD and GridSearch for better accuracy.
        """
        print("Vectorizing text...")
        # Fit vectorizer on both resume and job text to ensure shared vocabulary
        all_text = pd.concat([df['resume_text'], df['job_text']])
        tfidf_matrix = self.vectorizer.fit_transform(all_text)
        
        print("Fitting SVD...")
        self.svd.fit(tfidf_matrix)
        
        resume_tfidf = self.vectorizer.transform(df['resume_text'])
        job_tfidf = self.vectorizer.transform(df['job_text'])
        
        print("Transforming with SVD...")
        resume_svd = self.svd.transform(resume_tfidf)
        job_svd = self.svd.transform(job_tfidf)
        
        # Calculate Cosine Similarity as a feature
        cosine_sim = np.array([
            (resume_tfidf[i].multiply(job_tfidf[i])).sum() 
            for i in range(resume_tfidf.shape[0])
        ]).reshape(-1, 1)
        
        # Feature Engineering: Combine SVD vectors, Cosine Sim, and Interaction terms
        X = np.hstack([
            resume_svd,
            job_svd,
            cosine_sim,
            resume_svd * job_svd # Interaction term
        ])
        
        y = df['matched_score'].values
        
        print("Training Random Forest with GridSearchCV...")
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        param_grid = {
            'n_estimators': [100, 200],
            'max_depth': [None, 20],
            'min_samples_split': [2, 5]
        }
        
        grid_search = GridSearchCV(self.model, param_grid, cv=3, scoring='r2', n_jobs=-1, verbose=1)
        grid_search.fit(X_train, y_train)
        
        self.model = grid_search.best_estimator_
        
        train_preds = self.model.predict(X_train)
        test_preds = self.model.predict(X_test)
        
        print(f"Best Params: {grid_search.best_params_}")
        print(f"Train MSE: {mean_squared_error(y_train, train_preds)}")
        print(f"Test MSE: {mean_squared_error(y_test, test_preds)}")
        print(f"Test R2: {r2_score(y_test, test_preds)}")
        
        self.is_trained = True
        return {
            "test_mse": mean_squared_error(y_test, test_preds), 
            "test_r2": r2_score(y_test, test_preds),
            "best_params": grid_search.best_params_
        }

    def predict(self, resume_text, job_text):
        if not self.is_trained:
            raise Exception("Model is not trained yet.")
        
        resume_tfidf = self.vectorizer.transform([resume_text])
        job_tfidf = self.vectorizer.transform([job_text])
        
        resume_svd = self.svd.transform(resume_tfidf)
        job_svd = self.svd.transform(job_tfidf)
        
        cosine_sim = (resume_tfidf * job_tfidf.T).toarray()[0][0]
        
        X = np.hstack([
            resume_svd,
            job_svd,
            [[cosine_sim]],
            resume_svd * job_svd
        ])
        
        # Predict using the regressor
        # Get predictions from all trees to calculate confidence (uncertainty)
        tree_preds = [tree.predict(X)[0] for tree in self.model.estimators_]
        
        score = np.mean(tree_preds)
        std_dev = np.std(tree_preds)
        
        # Determine confidence level based on standard deviation
        if std_dev < 0.1:
            confidence_level = "High"
        elif std_dev < 0.2:
            confidence_level = "Medium"
        else:
            confidence_level = "Low"
        
        return {
            "predicted_score": float(score),
            "cosine_similarity": float(cosine_sim),
            "confidence_score": float(1.0 - std_dev),
            "confidence_level": confidence_level
        }

    def save(self, path):
        joblib.dump({
            'vectorizer': self.vectorizer, 
            'svd': self.svd,
            'model': self.model
        }, path)

    def load(self, path):
        if os.path.exists(path):
            data = joblib.load(path)
            self.vectorizer = data['vectorizer']
            self.svd = data['svd']
            self.model = data['model']
            self.is_trained = True
        else:
            print("Model file not found.")

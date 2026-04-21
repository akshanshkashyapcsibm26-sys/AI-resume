import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { resumeText, jobDescription } = await request.json();

        if (!resumeText || !jobDescription) {
            return NextResponse.json(
                { error: 'Resume text and job description are required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'OPENROUTER_API_KEY is not configured' },
                { status: 500 }
            );
        }

        const prompt = `You are a RUTHLESS, HIGHLY CRITICAL expert technical recruiter. You are evaluating a resume for a VERY strict technical role.

CRITICAL INSTRUCTIONS - EXTREMELY IMPORTANT:
1. STRICT TECH STACK MATCHING: You must check the EXACT required tech stack (e.g., C#, .NET, Angular) against the candidate's stack (e.g., Node.js, React, Python). If the primary tech stack is completely different, YOU MUST FAIL THE CANDIDATE. Do not give them a 7/10 just because they are a "Software Developer". If the core languages don't match, give a score of 0-2 for Skills Match and mark as "fail".
2. CASCADING FAILURES: If the candidate's core tech stack or profession does not match the job description, their "Impact" and "Sections" MUST ALSO FAIL (Score 0-3). Impact in an irrelevant technology does not count for this job.
3. NO PITY POINTS: Even if the resume is well-written and brief, if the tech stack is wrong, emphasize this explicitly in the feedback and give low scores.
4. GRADING SCALE: 
   - 9-10: Perfect tech stack match and relevant experience.
   - 7-8: Good match, maybe missing one minor skill.
   - 4-6: Mediocre, missing major core skills but has some overlap. Mark as "warning".
   - 0-3: Tech stack mismatch (e.g., React candidate for Angular job, or Node.js for C# job), or completely irrelevant profession. Mark as "fail".

Evaluate these categories strictly:
1. Impact: Are their achievements directly applicable to THIS job's specific tech stack? (Fail if wrong stack)
2. Brevity: Is it concise without fluff?
3. Style: Is it professionally formatted?
4. Sections: Are the skills and experience sections aligned with THIS specific job's needs?
5. Skills Match: Does the candidate have the EXACT core languages/frameworks requested?

For each category, provide:
- A very strict score out of 10
- A status MUST be "pass", "warning", or "fail" (Score 0-3 MUST be "fail")
- 2-3 specific bullet points explicitly calling out any missing tech stack requirements.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond ONLY with valid JSON in this exact format:
{
  "feedbackItems": [
    {
      "title": "Impact",
      "score": 8,
      "maxScore": 10,
      "status": "pass",
      "details": ["point 1", "point 2", "point 3"]
    }
  ]
}`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Resume Screening AI',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert resume analyzer. Always respond with valid JSON only, no markdown formatting.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 10000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to generate feedback', details: errorData },
                { status: 500 }
            );
        }

        const data = await response.json();
        let responseText = '{}';

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            responseText = data.choices[0].message.content || '{}';
        }

        // Clean up response if it has markdown code blocks
        const cleanedResponse = responseText
            .replace(/```json\n/g, '')
            .replace(/```\n/g, '')
            .replace(/```/g, '')
            .trim();

        let feedbackData;
        try {
            feedbackData = JSON.parse(cleanedResponse);
        } catch (e: any) {
            console.error('Failed to parse JSON from Gemini:', e.message);
            console.error('Cleaned Response:', cleanedResponse);

            // Fallback response in case of catastrophic parsing failure
            feedbackData = {
                feedbackItems: [
                    {
                        title: "Parsing Error",
                        score: 0,
                        maxScore: 10,
                        status: "fail",
                        details: ["We encountered an issue analyzing this resume.", "Please try again."]
                    }
                ]
            };
        }

        return NextResponse.json(feedbackData);
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Failed to generate feedback', details: error.message },
            { status: 500 }
        );
    }
}

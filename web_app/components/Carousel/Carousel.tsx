"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

import './Carousel.css';

const DEFAULT_ITEMS = [
    {
        title: 'The best AI resume builder',
        description: 'It took all the stress out of resume writing. I just entered my info, and the AI did the rest. Great tool, best value!',
        id: 1,
        author: 'Kevin Phan • about 3 days ago'
    },
    {
        title: 'Well done, BetterCV!',
        description: 'The AI showed me what employers want to see. I’ve already gotten three interview invitations since I updated my resume here.',
        id: 2,
        author: 'Brittany Cole • about 3 days ago'
    },
    {
        title: 'Instant confidence boost',
        description: 'My resume used to look plain and boring. BetterCV solved that issue. Now it’s well-written, and already got me an interview!',
        id: 3,
        author: 'Sean McAllister • about 3 days ago'
    },
    {
        title: 'Game changer for my job search',
        description: 'I was struggling to get callbacks until I used this builder. The AI suggestions were spot on.',
        id: 4,
        author: 'Michael R. • about 5 days ago'
    },
    {
        title: 'Incredibly easy to use',
        description: 'The interface is intuitive and the generated content is actually professional. Highly recommend.',
        id: 5,
        author: 'Sarah J. • about 1 week ago'
    }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: any = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, transition }: any) {
    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            className={`carousel-item ${round ? 'round' : ''}`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                ...(round && { borderRadius: '50%' })
            }}
            transition={transition}
        >
            <div className={`carousel-item-header ${round ? 'round' : ''}`}>
                <div style={{ display: 'flex', gap: '4px', color: '#10b981' }}>
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                </div>
            </div>
            <div className="carousel-item-content">
                <div className="carousel-item-title">{item.title}</div>
                <p className="carousel-item-description">{item.description}</p>
                <p className="carousel-item-author">{item.author}</p>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 350,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false
}: any) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;
    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container: any = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition((prev: any) => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_: any, info: any) => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition((prev: any) => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0
            }
        };

    const activeIndex =
        items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? 'round' : ''}`}
            style={{
                width: '100%',
                ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
            }}
        >
            <motion.div
                className="carousel-track"
                drag={isAnimating ? false : 'x'}
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item: any, index: any) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        index={index}
                        itemWidth={itemWidth}
                        round={round}
                        trackItemOffset={trackItemOffset}
                        x={x}
                        transition={effectiveTransition}
                    />
                ))}
            </motion.div>
            <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
                <div className="carousel-indicators">
                    {items.map((_: any, index: any) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
                            animate={{
                                scale: activeIndex === index ? 1.2 : 1
                            }}
                            onClick={() => setPosition(loop ? index + 1 : index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

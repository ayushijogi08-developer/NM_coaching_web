import React from 'react';
import ScrollReveal from './ScrollReveal';

/**
 * Stagger wrapper that takes children and automatically gives each child
 * an increasing delay (e.g. 100ms steps) using ScrollReveal.
 */
export default function Stagger({
  children,
  step = 100,
  initialDelay = 0,
  variant = 'up',
  duration = 700,
  className = '',
  itemClassName = '',
  as: Component = 'div',
}) {
  const childArray = React.Children.toArray(children).filter(Boolean);

  return (
    <Component className={className}>
      {childArray.map((child, index) => {
        const delay = Math.min(initialDelay + index * step, 600);
        return (
          <ScrollReveal
            key={child.key || index}
            delay={delay}
            variant={variant}
            duration={duration}
            className={itemClassName}
          >
            {child}
          </ScrollReveal>
        );
      })}
    </Component>
  );
}

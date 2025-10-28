import {ReactNode, cloneElement, isValidElement} from 'react';

/**
 * Reusable button with optional icon and label
 * 
 * @param {{
 *   icon?: string | ReactNode | { src: string | ReactNode, alt?: string, width?: number, height?: number },
 *   label?: string,
 *   isActive?: boolean,
 *   disabled?: boolean,
 *   onClick?: () => void,
 *   layout?: 'row' | 'column',
 *   className?: string,
 * }} props 
 */
export const ButtonTool = ({
  icon,
  label = '',
  isActive = false,
  disabled = false,
  onClick,
  layout = 'column',
  className = '',
}) => {
  const flexLayout = layout === 'row' ? 'flex-row gap-1' : 'flex-col';

  let iconElement = null;

  if (icon) {
    if (isValidElement(icon)) { // If icon is a React element directly (like <Pencil1Icon />)
      iconElement = cloneElement(icon, {
        className: `object-contain transition-all ${
          disabled ? 'grayscale opacity-50' : ''
        } ${icon.props.className || ''}`.trim(),
      });
    } else if (typeof icon === 'object' && icon.src) { // If icon is an object with a src property
      if (typeof icon.src === 'string') { // If icon.src is a string (for img src)
        iconElement = (
          <img
            src={icon.src}
            alt={icon.alt || 'icon'}
            style={{
              width: icon.width || 24,
              height: icon.height || 24,
            }}
            className={`object-contain transition-all ${
              disabled ? 'grayscale opacity-50' : ''
            }`}
          />
        );
      } else if (isValidElement(icon.src)) { // If icon.src is a React element
        iconElement = cloneElement(icon.src, {
          width: icon.width || 24,
          height: icon.height || 24,
          className: `object-contain transition-all ${
            disabled ? 'grayscale opacity-50' : ''
          } ${icon.src.props.className || ''}`.trim(),
        });
      }
    }
  }

  const labelElement = label ? (
    <span
      className={`mt-0.5 text-[11px] ${
        disabled
          ? 'text-gray-300'
          : 'text-gray-900 font-medium'
      }`}
    >
      {label}
    </span>
  ) : null;

  return (
    <button
      type="button"
      title={typeof icon === 'object' && icon.alt ? icon.alt : label}
      disabled={disabled}
      onClick={onClick}
      className={`flex ${flexLayout} items-center justify-center p-1 rounded text-[11px] transition-colors
        ${isActive ? 'text-[#49b0f2] bg-blue-100' : 'hover:text-gray-900'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {iconElement}
      {labelElement}
    </button>
  );
};
/**
 * Enhanced PropTypes Validation
 * Provides TypeScript-like validation with custom validators
 * Includes documentation and runtime type checking
 */

import PropTypes from 'prop-types';

/**
 * Custom PropTypes validators
 */

/**
 * Validate theme enum
 */
export const themeType = PropTypes.oneOf(['light', 'dark', 'auto', 'high-contrast']);

/**
 * Validate tab enum
 */
export const tabType = PropTypes.oneOf([
  'leftbrain', 
  'rightbrain', 
  'developer-tools', 
  'qa-tools', 
  'general-tools'
]);

/**
 * Validate event name
 */
export const eventNameType = PropTypes.string;

/**
 * Validate component metadata
 */
export const componentMetadataType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOf(['regular', 'lazy'])
});

/**
 * Validate navigation item
 */
export const navigationItemType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
});

/**
 * Validate error object
 */
export const errorType = PropTypes.shape({
  message: PropTypes.string,
  stack: PropTypes.string,
  name: PropTypes.string
});

/**
 * Validate performance data
 */
export const performanceDataType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  duration: PropTypes.number,
  timestamp: PropTypes.number,
  details: PropTypes.object
});

/**
 * Validate API response
 */
export const apiResponseType = PropTypes.shape({
  data: PropTypes.any,
  status: PropTypes.number,
  statusText: PropTypes.string,
  headers: PropTypes.object
});

/**
 * Validate loading state
 */
export const loadingStateType = PropTypes.shape({
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, errorType]),
  data: PropTypes.any
});

/**
 * Custom validators
 */

/**
 * Validate URL string
 */
export const urlType = (props, propName, componentName) => {
  const value = props[propName];
  if (value == null) return null;
  
  if (typeof value !== 'string') {
    return new Error(`Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`string\`.`);
  }
  
  try {
    new URL(value);
  } catch (error) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected valid URL.`);
  }
  
  return null;
};

/**
 * Validate email string
 */
export const emailType = (props, propName, componentName) => {
  const value = props[propName];
  if (value == null) return null;
  
  if (typeof value !== 'string') {
    return new Error(`Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`string\`.`);
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected valid email address.`);
  }
  
  return null;
};

/**
 * Validate positive number
 */
export const positiveNumber = (props, propName, componentName) => {
  const value = props[propName];
  if (value == null) return null;
  
  if (typeof value !== 'number') {
    return new Error(`Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`number\`.`);
  }
  
  if (value <= 0) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected positive number.`);
  }
  
  return null;
};

/**
 * Validate non-empty string
 */
export const nonEmptyString = (props, propName, componentName) => {
  const value = props[propName];
  if (value == null) return null;
  
  if (typeof value !== 'string') {
    return new Error(`Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`string\`.`);
  }
  
  if (value.trim().length === 0) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected non-empty string.`);
  }
  
  return null;
};

/**
 * Validate function with specific arity
 */
export const functionWithArity = (arity) => {
  return (props, propName, componentName) => {
    const value = props[propName];
    if (value == null) return null;
    
    if (typeof value !== 'function') {
      return new Error(`Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`function\`.`);
    }
    
    if (value.length !== arity) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected function with ${arity} parameters.`);
    }
    
    return null;
  };
};

/**
 * Validate object with specific shape but allow additional properties
 */
export const looseShape = (shape) => {
  return (props, propName, componentName) => {
    const value = props[propName];
    if (value == null) return null;
    
    if (typeof value !== 'object' || Array.isArray(value)) {
      return new Error(`Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`object\`.`);
    }
    
    for (const key in shape) {
      const validator = shape[key];
      const error = validator({ [key]: value[key] }, key, componentName);
      if (error) return error;
    }
    
    return null;
  };
};

/**
 * Validate array of specific type
 */
export const arrayOfType = (type) => {
  return PropTypes.arrayOf(type);
};

/**
 * Validate one of type or array of types
 */
export const oneOfTypeOrArrayOf = (...types) => {
  return PropTypes.oneOfType([
    ...types,
    PropTypes.arrayOf(PropTypes.oneOfType(types))
  ]);
};

/**
 * Common prop type combinations
 */
export const childrenType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node)
]);

export const classNameType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.object
]);

export const styleType = PropTypes.object;

export const refType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.any })
]);

/**
 * Size variants
 */
export const sizeType = PropTypes.oneOf(['small', 'medium', 'large']);

/**
 * Color variants
 */
export const colorType = PropTypes.oneOf([
  'primary', 
  'secondary', 
  'success', 
  'warning', 
  'error', 
  'info'
]);

/**
 * Common component props
 */
export const commonPropTypes = {
  className: classNameType,
  style: styleType,
  children: childrenType,
  id: PropTypes.string,
  'data-testid': PropTypes.string
};

/**
 * Event handler props
 */
export const eventHandlerPropTypes = {
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func
};

/**
 * Accessibility props
 */
export const a11yPropTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-expanded': PropTypes.bool,
  'aria-hidden': PropTypes.bool,
  role: PropTypes.string,
  tabIndex: PropTypes.number
};

/**
 * HOC for adding prop validation to components
 */
export const withPropTypes = (propTypes, defaultProps = {}) => {
  return (WrappedComponent) => {
    WrappedComponent.propTypes = {
      ...WrappedComponent.propTypes,
      ...propTypes
    };
    
    WrappedComponent.defaultProps = {
      ...WrappedComponent.defaultProps,
      ...defaultProps
    };
    
    return WrappedComponent;
  };
};

/**
 * Runtime type checking for development
 */
export const validateProps = (props, propTypes, componentName) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  
  PropTypes.checkPropTypes(propTypes, props, 'prop', componentName);
};

/**
 * Create documented prop types
 */
export const createPropTypes = (definitions) => {
  const propTypes = {};
  const documentation = {};
  
  Object.entries(definitions).forEach(([propName, definition]) => {
    if (typeof definition === 'object' && definition.type) {
      propTypes[propName] = definition.type;
      documentation[propName] = {
        description: definition.description || '',
        defaultValue: definition.defaultValue,
        required: definition.required || false,
        examples: definition.examples || []
      };
    } else {
      propTypes[propName] = definition;
    }
  });
  
  // Attach documentation for development tools
  if (process.env.NODE_ENV === 'development') {
    propTypes.__documentation = documentation;
  }
  
  return propTypes;
};

export default {
  // Basic types
  themeType,
  tabType,
  eventNameType,
  urlType,
  emailType,
  positiveNumber,
  nonEmptyString,
  
  // Complex types
  componentMetadataType,
  navigationItemType,
  errorType,
  performanceDataType,
  apiResponseType,
  loadingStateType,
  
  // Validators
  functionWithArity,
  looseShape,
  arrayOfType,
  oneOfTypeOrArrayOf,
  
  // Common types
  childrenType,
  classNameType,
  styleType,
  refType,
  sizeType,
  colorType,
  
  // Prop type groups
  commonPropTypes,
  eventHandlerPropTypes,
  a11yPropTypes,
  
  // Utilities
  withPropTypes,
  validateProps,
  createPropTypes
};
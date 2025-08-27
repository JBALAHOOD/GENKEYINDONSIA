// Character sets for password generation
export const CHARACTER_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/**
 * Generate a random password based on the given options
 * @param {number} length - Length of the password
 * @param {Object} options - Character type options
 * @returns {string} Generated password
 */
export const generatePassword = (length, options) => {
  // Build character pool based on selected options
  let chars = '';
  if (options.uppercase) chars += CHARACTER_SETS.uppercase;
  if (options.lowercase) chars += CHARACTER_SETS.lowercase;
  if (options.numbers) chars += CHARACTER_SETS.numbers;
  if (options.symbols) chars += CHARACTER_SETS.symbols;

  // Ensure at least one character type is selected
  if (chars === '') {
    chars = CHARACTER_SETS.lowercase;
  }

  // Generate password
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

/**
 * Calculate password strength based on length and character types
 * @param {string} password - The password to analyze
 * @param {Object} options - Character type options used
 * @returns {Object} Strength analysis
 */
export const calculatePasswordStrength = (password, options) => {
  let score = 0;
  let feedback = [];

  // Length scoring
  if (password.length >= 12) {
    score += 25;
  } else if (password.length >= 8) {
    score += 15;
  } else {
    feedback.push('Use at least 8 characters');
  }

  // Character variety scoring
  const typeCount = Object.values(options).filter(Boolean).length;
  score += typeCount * 15;

  if (typeCount < 3) {
    feedback.push('Include more character types');
  }

  // Determine strength level
  let level = 'Weak';
  let color = 'text-red-500';
  
  if (score >= 70) {
    level = 'Very Strong';
    color = 'text-green-500';
  } else if (score >= 50) {
    level = 'Strong';
    color = 'text-blue-500';
  } else if (score >= 30) {
    level = 'Medium';
    color = 'text-yellow-500';
  }

  return {
    score: Math.min(score, 100),
    level,
    color,
    feedback
  };
};

/**
 * Copy text to clipboard with fallback for older browsers
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch (fallbackErr) {
      return false;
    }
  }
};
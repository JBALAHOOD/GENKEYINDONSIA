import { useState, useCallback } from 'react';
import { generatePassword, calculatePasswordStrength, copyToClipboard } from '../utils/passwordGenerator';

/**
 * Custom hook for password generation functionality
 */
export const usePasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  // Generate new password
  const handleGeneratePassword = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const newPassword = generatePassword(length, options);
      setPassword(newPassword);
      setIsGenerating(false);
    }, 300);
  }, [length, options]);

  // Handle option changes
  const handleOptionChange = useCallback((option, checked) => {
    setOptions(prev => {
      const newOptions = { ...prev, [option]: checked };
      
      // Ensure at least one option is selected
      const hasAnyOption = Object.values(newOptions).some(Boolean);
      if (!hasAnyOption) {
        return { ...newOptions, lowercase: true };
      }
      
      return newOptions;
    });
  }, []);

  // Handle length change
  const handleLengthChange = useCallback((newLength) => {
    setLength(Array.isArray(newLength) ? newLength[0] : newLength);
  }, []);

  // Handle copy to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    if (!password) return;
    
    const success = await copyToClipboard(password);
    
    if (success) {
      setIsCopied(true);
      setCopyFeedback('Password copied successfully!');
      setTimeout(() => {
        setIsCopied(false);
        setCopyFeedback('');
      }, 2000);
    } else {
      setCopyFeedback('Failed to copy password');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  }, [password]);

  // Calculate password strength
  const passwordStrength = password ? calculatePasswordStrength(password, options) : null;

  return {
    // State
    password,
    length,
    options,
    isGenerating,
    isCopied,
    copyFeedback,
    passwordStrength,
    
    // Actions
    generatePassword: handleGeneratePassword,
    handleOptionChange,
    handleLengthChange,
    copyToClipboard: handleCopyToClipboard
  };
};
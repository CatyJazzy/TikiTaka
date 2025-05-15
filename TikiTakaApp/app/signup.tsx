import { Stack } from 'tamagui';
import { useState } from 'react';
import { router } from 'expo-router';
import { Step1 } from './signup/Step1';
import { Step2 } from './signup/Step2';
import { Step3 } from './signup/Step3';
import { Step4 } from './signup/Step4';
import { Step5 } from './signup/Step5';
import { Step6 } from './signup/Step6';
import { Step7 } from './signup/Step7';
import { SignupFormData } from './signup/types';
import { API_URL } from '../constants';

export default function SignupScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    verificationCode: '',
    isEmailVerified: false,
    portalImage: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    otherGender: '',
    primaryLanguage: '',
    targetLanguage: '',
    canSpeakEnglish: false,
    activities: [],
    otherActivity: '',
    profileImage: '',
  });

  const handleUpdate = (data: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (currentStep === 7) {
      try {
        setIsSubmitting(true);
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || '회원가입에 실패했습니다.');
        }

        alert('회원가입이 완료되었습니다.');
        router.replace('/login');
      } catch (error) {
        alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Stack 
      flex={1} 
      alignItems="center" 
      justifyContent="center" 
      padding="$4"
      backgroundColor="rgba(255, 255, 240, 0.3)"
    >
      {currentStep === 1 && (
        <Step1
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 4 && (
        <Step4
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 5 && (
        <Step5
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 6 && (
        <Step6
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
        />
      )}
      {currentStep === 7 && (
        <Step7
          formData={formData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrev={handlePrev}
          currentStep={currentStep}
          isSubmitting={isSubmitting}
        />
      )}
    </Stack>
  );
} 
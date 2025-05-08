import { Stack } from 'tamagui';
import { useState } from 'react';
import { router } from 'expo-router';
import { Step1 } from './signup/Step1';
import { Step2 } from './signup/Step2';
import { Step3 } from './signup/Step3';
import { Step4 } from './signup/Step4';
import { Step5 } from './signup/Step5';
import { SignupFormData } from './signup/types';

export default function SignupScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
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
  });

  const handleUpdate = (data: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep === 5) {
      // TODO: 회원가입 로직 구현
      console.log('회원가입 완료:', formData);
      router.replace('/login');
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
    </Stack>
  );
} 
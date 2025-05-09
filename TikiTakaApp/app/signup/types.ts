export interface SignupFormData {
  portalImage: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  otherGender: string;
  primaryLanguage: string;
  targetLanguage: string;
  canSpeakEnglish: boolean;
  activities: string[];
  otherActivity: string;
  profileImage: string;
}

export interface SignupStepProps {
  formData: SignupFormData;
  onUpdate: (data: Partial<SignupFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
} 
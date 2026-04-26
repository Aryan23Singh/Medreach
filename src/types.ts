/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 
  | 'SPLASH' 
  | 'ONBOARDING' 
  | 'LOGIN' 
  | 'HOME' 
  | 'SEARCH_RESULTS' 
  | 'DOCTOR_PROFILE' 
  | 'SLOT_BOOKING' 
  | 'PAYMENT' 
  | 'CONFIRMED' 
  | 'VIDEO_CALL';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: number;
  status: 'Now' | 'In 2hrs' | 'Booked';
  initials: string;
  avatarColor: string;
}

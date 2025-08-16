// import { useState, useCallback, useRef } from 'react';
// import { useDebounce } from './useDebounce';
// import { createResume, updateResume } from '@/lib/api/resume';
// import { isEqual } from 'lodash'; // Make sure to install lodash if not already installed

// interface UseResumeFormProps {
//   clerkId: string;
//   initialData: any;
//   onSaved?: (data: any) => void;
//   debounceMs?: number;
// }

// export function useResumeForm({
//   clerkId,
//   initialData,
//   onSaved,
//   debounceMs = 2000,
// }: UseResumeFormProps) {
//   const [formData, setFormData] = useState(initialData);
//   const [error, setError] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const previousDataRef = useRef(initialData);

//   const saveData = useCallback(
//     async (data: any) => {
//       // Check if data has actually changed
//       if (isEqual(previousDataRef.current, data)) {
//         return null; // Skip save if data hasn't changed
//       }

//       try {
//         setIsSaving(true);
//         setError(null);

//         let savedData;
//         if (!data.id) {
//           savedData = await createResume({
//             ...data,
//             clerkId,
//           });
//         } else {
//           savedData = await updateResume(data.id, data);
//         }

//         // Update previous data reference after successful save
//         previousDataRef.current = savedData;
//         onSaved?.(savedData);
//         return savedData;
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to save changes');
//         return null;
//       } finally {
//         setIsSaving(false);
//       }
//     },
//     [clerkId, onSaved]
//   );

//   // Debounced save function
//   const debouncedSave = useDebounce(saveData, debounceMs);

//   const updateFormData = useCallback(
//     (newData: any) => {
//       setFormData((prev: any) => {
//         const updated = { ...prev, ...newData };

//         // Only trigger save if data has actually changed
//         if (!isEqual(previousDataRef.current, updated)) {
//           debouncedSave(updated);
//         }

//         return updated;
//       });
//     },
//     [debouncedSave]
//   );

//   return {
//     formData,
//     updateFormData,
//     isSaving,
//     error,
//     saveImmediately: saveData,
//   };
// }

import { toast as sonnerToast } from 'sonner'

import { Toast } from '@/components/Toast'

const ERROR_DURATION_MS = 6000
const SUCCESS_DURATION_MS = 4000

export const toast = {
  error: (message: string) =>
    sonnerToast.custom(
      (id) => <Toast type="error" message={message} onClose={() => sonnerToast.dismiss(id)} />,
      { duration: ERROR_DURATION_MS },
    ),
  success: (message: string) =>
    sonnerToast.custom(
      (id) => <Toast type="success" message={message} onClose={() => sonnerToast.dismiss(id)} />,
      { duration: SUCCESS_DURATION_MS },
    ),
}

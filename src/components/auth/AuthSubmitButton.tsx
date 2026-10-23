interface AuthSubmitButtonProps {
  isLoading: boolean;
  idleLabel: string;
  loadingLabel: string;
}

export default function AuthSubmitButton({
  isLoading,
  idleLabel,
  loadingLabel,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 animate-spin"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />
        </svg>
      )}

      <span>{isLoading ? loadingLabel : idleLabel}</span>
    </button>
  );
}

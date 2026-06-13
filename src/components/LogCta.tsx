import { useAppStore } from '@/store/useAppStore';
import { CheckIcon, PlusIcon } from '@/lib/icons';
import { doSignIn } from '@/lib/actions';
import { todayStr } from '@/lib/date';

/** The "Log this workout" button shown under each day header. */
export function LogCta({ workoutKey }: { workoutKey: string }) {
  const user = useAppStore((s) => s.user);
  const logs = useAppStore((s) => s.logs);
  const openLogModal = useAppStore((s) => s.openLogModal);

  const today = todayStr();
  const doneToday =
    !!user && logs.some((l) => l.workoutKey === workoutKey && l.date === today);

  const onClick = () => {
    if (!user) {
      doSignIn();
      return;
    }
    openLogModal(workoutKey, today);
  };

  return (
    <button
      className={'log-cta' + (doneToday ? ' done' : '')}
      onClick={onClick}
    >
      {doneToday ? (
        <>
          <CheckIcon />
          <span>Done today · log again</span>
        </>
      ) : (
        <>
          <PlusIcon />
          <span>Log this workout</span>
        </>
      )}
    </button>
  );
}

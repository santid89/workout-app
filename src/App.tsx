import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/hooks/useAuth';
import { useLogSync } from '@/hooks/useLogSync';
import { PROGRAM } from '@/data/program';
import { AuthGate } from '@/components/AuthGate';
import { Header } from '@/components/Header';
import { AccountMenu } from '@/components/AccountMenu';
import { DayPicker } from '@/components/DayPicker';
import { WorkoutDay } from '@/components/WorkoutDay';
import { FuelPanel } from '@/components/panels/FuelPanel';
import { AboutPanel } from '@/components/panels/AboutPanel';
import { LogHistory } from '@/components/LogHistory';
import { LogModal } from '@/components/LogModal';
import { ToastContainer } from '@/components/Toast';

export default function App() {
  useAuth();
  useLogSync();
  const selectedDay = useAppStore((s) => s.selectedDay);

  return (
    <>
      <AuthGate />
      <Header />
      <AccountMenu />
      <DayPicker />

      <main>
        {PROGRAM.map((day) => (
          <WorkoutDay
            key={day.key}
            day={day}
            active={selectedDay === day.key}
          />
        ))}
        <LogHistory active={selectedDay === 'log'} />
        <FuelPanel active={selectedDay === 'fuel'} />
        <AboutPanel active={selectedDay === 'about'} />
      </main>

      <LogModal />
      <ToastContainer />
    </>
  );
}

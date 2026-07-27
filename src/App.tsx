import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/hooks/useAuth';
import { useLogSync } from '@/hooks/useLogSync';
import { useHealthSync } from '@/hooks/useHealthSync';
import { PROGRAM } from '@/data/program';
import { AuthGate } from '@/components/AuthGate';
import { Header } from '@/components/Header';
import { AccountMenu } from '@/components/AccountMenu';
import { BottomNav, SideNav } from '@/components/Nav';
import { WeekStrip } from '@/components/WeekStrip';
import { Today } from '@/components/Today';
import { WorkoutDay } from '@/components/WorkoutDay';
import { FuelPanel } from '@/components/panels/FuelPanel';
import { AboutPanel } from '@/components/panels/AboutPanel';
import { HealthPanel } from '@/components/panels/HealthPanel';
import { LogHistory } from '@/components/LogHistory';
import { LogModal } from '@/components/LogModal';
import { InjectionModal } from '@/components/InjectionModal';
import { PlacementManager } from '@/components/PlacementManager';
import { ToastContainer } from '@/components/Toast';

export default function App() {
  useAuth();
  useLogSync();
  useHealthSync();
  const selectedDay = useAppStore((s) => s.selectedDay);
  const onWorkoutDay = /^[1-7]$/.test(selectedDay);

  return (
    <>
      <AuthGate />
      <SideNav />
      <Header />
      <AccountMenu />

      {onWorkoutDay && (
        <div className="train-bar">
          <div className="train-bar-inner">
            <WeekStrip />
          </div>
        </div>
      )}

      <main>
        <Today active={selectedDay === 'today'} />
        {PROGRAM.map((day) => (
          <WorkoutDay
            key={day.key}
            day={day}
            active={selectedDay === day.key}
          />
        ))}
        <LogHistory active={selectedDay === 'log'} />
        <HealthPanel active={selectedDay === 'health'} />
        <FuelPanel active={selectedDay === 'fuel'} />
        <AboutPanel active={selectedDay === 'about'} />
      </main>

      <BottomNav />
      <LogModal />
      <InjectionModal />
      <PlacementManager />
      <ToastContainer />
    </>
  );
}

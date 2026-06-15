import { useAppStore } from '@/store/useAppStore';
import { UtensilsIcon } from '@/lib/icons';
import { doSignIn } from '@/lib/actions';

/** Home-page button that opens the food-logging modal (text and/or photo). */
export function FoodLogCta() {
  const user = useAppStore((s) => s.user);
  const openFoodLogModal = useAppStore((s) => s.openFoodLogModal);

  const onClick = () => {
    if (!user) {
      doSignIn();
      return;
    }
    openFoodLogModal();
  };

  return (
    <button className="food-cta" onClick={onClick}>
      <UtensilsIcon />
      <span>Log food</span>
    </button>
  );
}

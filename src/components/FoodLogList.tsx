import { useAppStore } from '@/store/useAppStore';
import { removeFoodLog } from '@/firebase/food';
import { toast } from '@/store/toastStore';
import { TrashIcon } from '@/lib/icons';
import type { FoodLog } from '@/types';

/** How many recent entries to surface on the home page. */
const RECENT = 5;

const STATUS_LABEL: Record<FoodLog['status'], string> = {
  pending: 'Analysing…',
  processed: 'Done',
  error: 'Failed',
};

function round(n?: number): string {
  return typeof n === 'number' ? String(Math.round(n)) : '—';
}

/** The recent food entries with their (server-filled) nutrition estimate. */
export function FoodLogList() {
  const user = useAppStore((s) => s.user);
  const foodLogs = useAppStore((s) => s.foodLogs);

  if (!user || foodLogs.length === 0) return null;

  return (
    <>
      <div className="today-section-label">Recent food</div>
      <div className="food-list">
        {foodLogs.slice(0, RECENT).map((item) => (
          <FoodLogCard key={item.id} item={item} uid={user.uid} />
        ))}
      </div>
    </>
  );
}

function FoodLogCard({ item, uid }: { item: FoodLog; uid: string }) {
  const n = item.nutrition;

  const onDelete = async () => {
    try {
      await removeFoodLog(uid, item.id, item.photoPath);
    } catch (e) {
      const err = e as { code?: string; message?: string };
      toast("Couldn't delete: " + (err.code || err.message), 'error');
    }
  };

  return (
    <div className="food-card">
      {item.photoUrl && (
        <img className="food-card-thumb" src={item.photoUrl} alt="" />
      )}
      <div className="food-card-body">
        <div className="food-card-top">
          <span className="food-card-title">
            {n?.summary || item.description || 'Food entry'}
          </span>
          <span className={'food-status food-status-' + item.status}>
            {STATUS_LABEL[item.status]}
          </span>
        </div>

        {item.description && n?.summary && (
          <div className="food-card-desc">{item.description}</div>
        )}

        {item.status === 'processed' && n && (
          <div className="food-macros">
            <span className="food-macro">
              <b>{round(n.calories)}</b> kcal
            </span>
            <span className="food-macro">
              <b>{round(n.protein_g)}</b>g P
            </span>
            <span className="food-macro">
              <b>{round(n.carbs_g)}</b>g C
            </span>
            <span className="food-macro">
              <b>{round(n.fat_g)}</b>g F
            </span>
            {n.confidence && (
              <span className="food-macro food-confidence">
                {n.confidence} confidence
              </span>
            )}
          </div>
        )}

        {item.status === 'error' && (
          <div className="food-card-error">
            {item.error || "Couldn't analyse this entry."}
          </div>
        )}
      </div>

      <button
        type="button"
        className="food-card-del"
        aria-label="Delete entry"
        onClick={onDelete}
      >
        <TrashIcon />
      </button>
    </div>
  );
}

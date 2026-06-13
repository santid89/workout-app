import { useState } from 'react';
import { ChevronIcon } from '@/lib/icons';
import type { AccordionData } from '@/data/reference';

export function Accordion({ data }: { data: AccordionData }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion">
      <button
        className={'accordion-toggle' + (open ? ' open' : '')}
        onClick={() => setOpen((o) => !o)}
      >
        {data.title}
        <ChevronIcon className="chev" />
      </button>
      <div className={'accordion-body' + (open ? ' open' : '')}>
        {data.items.map((item) => (
          <div className="accordion-item" key={item.h4}>
            <h4>{item.h4}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
// FiMoreHorizontal;

import For from "../for";
import Show from "../show";
import "./index.scss";
interface PaginationProps {
  total: number;
  offset?: number;
  value: {
    page: number;
    perPage: number;
  };
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: { page: number; perPage: number }) => void;
}

function Pagination({
  total,
  offset = 2,
  onChange,
  className,
  ...props
}: PaginationProps) {
  const [{ page, perPage }, setValue] = useState(
    props.value || { page: 1, perPage: 10 }
  );

  const max = Math.ceil(total / perPage);
  const pages = Array.from({ length: max }, (_, i) => i + 1);

  const showPages = pages.slice(
    Math.max(0, page - offset - 1),
    Math.min(page + offset, max)
  );

  const changePage = (p: number) => {
    if (page < 1 || page > max) return;
    setValue({ page: p, perPage });
    if (onChange) onChange({ page: p, perPage });
  };

  const changePerPage = (p: number) => {
    setValue({ page: 1, perPage: p });
    if (onChange) onChange({ page: 1, perPage: p });
  };

  return (
    <div
      className={` flex flex-wrap gap-2 sm:gap-4 items-center  ${className}`}
    >
      <span className="hidden lg:inline-block">Total {total} items</span>
      <div className="pagination text-primary underline">
        <button disabled={page === 1} onClick={() => changePage(page - 1)}>
          <AiOutlineLeft />
        </button>
        <Show when={page > offset + 1}>
          <button onClick={() => changePage(1)}>1</button>
        </Show>
        <Show when={page > offset + 1}>
          <span>
            <FiMoreHorizontal />
          </span>
        </Show>
        <For each={showPages}>
          {(p) => (
            <button
              onClick={() => changePage(p)}
              key={page}
              className={p === page ? "active" : ""}
            >
              {p}
            </button>
          )}
        </For>
        <Show when={page < max - offset}>
          <span>
            <FiMoreHorizontal />
          </span>
        </Show>
        <Show when={page < max - offset}>
          <button onClick={() => changePage(max)}>{max}</button>
        </Show>
        <button onClick={() => changePage(page + 1)} disabled={page === max}>
          <AiOutlineRight />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <select
          onChange={(e) => changePerPage(Number(e.target.value))}
          value={perPage}
        >
          <option label="5 / page">5</option>
          <option label="10 / page">10</option>
          <option label="20 / page">20</option>
          <option label="50 / page">50</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;

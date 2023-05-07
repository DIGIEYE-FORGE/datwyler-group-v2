import React from "react";
import LazyInput from "../lazy-input";
import styled from "styled-components";
import { rgba } from "polished";
import Select from "../select";

const More = () => (
  <span className=" flex align-center">
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_555_209066)">
        <rect
          width="16"
          height="16"
          transform="translate(0.5 0.5)"
          fill="white"
          fillOpacity="0.01"
        />
        <path
          d="M3.49951 9.99918C3.10169 9.99918 2.72016 9.84114 2.43885 9.55984C2.15755 9.27853 1.99951 8.897 1.99951 8.49918C1.99951 8.10135 2.15755 7.71982 2.43885 7.43852C2.72016 7.15721 3.10169 6.99918 3.49951 6.99918C3.89734 6.99918 4.27887 7.15721 4.56017 7.43852C4.84148 7.71982 4.99951 8.10135 4.99951 8.49918C4.99951 8.897 4.84148 9.27853 4.56017 9.55984C4.27887 9.84114 3.89734 9.99918 3.49951 9.99918ZM8.49951 9.99918C8.10169 9.99918 7.72016 9.84114 7.43885 9.55984C7.15755 9.27853 6.99951 8.897 6.99951 8.49918C6.99951 8.10135 7.15755 7.71982 7.43885 7.43852C7.72016 7.15721 8.10169 6.99918 8.49951 6.99918C8.89734 6.99918 9.27887 7.15721 9.56017 7.43852C9.84148 7.71982 9.99951 8.10135 9.99951 8.49918C9.99951 8.897 9.84148 9.27853 9.56017 9.55984C9.27887 9.84114 8.89734 9.99918 8.49951 9.99918ZM13.4995 9.99918C13.1017 9.99918 12.7202 9.84114 12.4389 9.55984C12.1575 9.27853 11.9995 8.897 11.9995 8.49918C11.9995 8.10135 12.1575 7.71982 12.4389 7.43852C12.7202 7.15721 13.1017 6.99918 13.4995 6.99918C13.8973 6.99918 14.2789 7.15721 14.5602 7.43852C14.8415 7.71982 14.9995 8.10135 14.9995 8.49918C14.9995 8.897 14.8415 9.27853 14.5602 9.55984C14.2789 9.84114 13.8973 9.99918 13.4995 9.99918Z"
          fill="#4587EA"
        />
      </g>
      <defs>
        <clipPath id="clip0_555_209066">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  </span>
);

const Prev = () => (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_555_209050)">
      <rect
        width="12"
        height="12"
        transform="translate(0 0.5)"
        fill="white"
        fillOpacity="0.01"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.51519 1.73368C8.55012 1.76851 8.57782 1.80989 8.59673 1.85545C8.61563 1.90101 8.62536 1.94985 8.62536 1.99918C8.62536 2.0485 8.61563 2.09735 8.59673 2.1429C8.57782 2.18846 8.55012 2.22984 8.51519 2.26468L4.27994 6.49918L8.51519 10.7337C8.58561 10.8041 8.62517 10.8996 8.62517 10.9992C8.62517 11.0988 8.58561 11.1943 8.51519 11.2647C8.44478 11.3351 8.34928 11.3747 8.24969 11.3747C8.15011 11.3747 8.05461 11.3351 7.98419 11.2647L3.48419 6.76468C3.44927 6.72984 3.42156 6.68846 3.40266 6.6429C3.38375 6.59734 3.37402 6.5485 3.37402 6.49918C3.37402 6.44985 3.38375 6.40101 3.40266 6.35545C3.42156 6.3099 3.44927 6.26851 3.48419 6.23368L7.98419 1.73368C8.01903 1.69876 8.06041 1.67105 8.10597 1.65214C8.15153 1.63324 8.20037 1.62351 8.24969 1.62351C8.29902 1.62351 8.34786 1.63324 8.39342 1.65214C8.43898 1.67105 8.48036 1.69876 8.51519 1.73368Z"
        fill="#4587EA"
      />
    </g>
    <defs>
      <clipPath id="clip0_555_209050">
        <rect
          width="12"
          height="12"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const Next = () => (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_555_209110)">
      <rect
        width="12"
        height="12"
        transform="translate(0 0.5)"
        fill="white"
        fillOpacity="0.01"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.48419 1.73368C3.51903 1.69876 3.56041 1.67105 3.60597 1.65214C3.65153 1.63324 3.70037 1.62351 3.74969 1.62351C3.79902 1.62351 3.84786 1.63324 3.89342 1.65214C3.93898 1.67105 3.98036 1.69876 4.01519 1.73368L8.51519 6.23368C8.55012 6.26851 8.57782 6.3099 8.59673 6.35545C8.61563 6.40101 8.62536 6.44985 8.62536 6.49918C8.62536 6.5485 8.61563 6.59734 8.59673 6.6429C8.57782 6.68846 8.55012 6.72984 8.51519 6.76468L4.01519 11.2647C3.94478 11.3351 3.84928 11.3747 3.74969 11.3747C3.65011 11.3747 3.55461 11.3351 3.48419 11.2647C3.41378 11.1943 3.37422 11.0988 3.37422 10.9992C3.37422 10.8996 3.41378 10.8041 3.48419 10.7337L7.71944 6.49918L3.48419 2.26468C3.44927 2.22984 3.42156 2.18846 3.40266 2.1429C3.38375 2.09735 3.37402 2.0485 3.37402 1.99918C3.37402 1.94985 3.38375 1.90101 3.40266 1.85545C3.42156 1.80989 3.44927 1.76851 3.48419 1.73368Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_555_209110">
        <rect
          width="12"
          height="12"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const PaginagtionStyled = styled.div`
  display: flex;
  border-radius: 1;
  border: 1px solid ${(props) => props.theme.palette.secondary};
  width: fit-content;
  border-radius: 0.25em;
  color: ${(props) => props.theme.palette.info};
  & > div {
    text-decoration: underline;
    padding: 0.5em;
    border-right: 1px solid ${(props) => props.theme.palette.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5em;
  }
  & > div:last-child {
    border-right: none;
  }
  & > .active {
    background-color: ${(props) => props.theme.palette.info};
    color: white;
    border: none;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: -1px;
      width: 100%;
      height: 1px;
      background-color: ${(props) => props.theme.palette.info};
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: ${(props) => props.theme.palette.info};
    }
  }
  & > .pointer {
    cursor: pointer;
    &:hover {
      background-color: ${(props) => rgba(props.theme.palette.info, 0.1)};
    }
  }
  svg {
    path {
      fill: ${(props) => props.theme.palette.info};
    }
  }
  .disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: ${(props) => props.theme.palette.secondary};
    svg {
      path {
        fill: ${(props) => props.theme.palette.secondary};
      }
    }
  }
`;

PaginagtionStyled.defaultProps = {
  theme: {
    palette: {
      primary: "#4587EA",
      info: "#4587EA",

      secondary: "#d3cdcd",
    },
  },
};
type PerPage = number;
interface PaginationProps {
  total: number;
  page: number;
  perPage: PerPage;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: PerPage) => void;
  className?: string;
  style?: React.CSSProperties;
}
const Pagination = ({ total, ...props }: PaginationProps) => {
  const [page, setPage] = React.useState(props.page);
  const [perPage, setPerPage] = React.useState(props.perPage);
  const [count, setCount] = React.useState(Math.ceil(total / perPage));
  const [initialRender, setInitialRender] = React.useState(true);
  React.useEffect(() => {
    setCount(Math.ceil(total / perPage));
  }, [total, perPage]);

  React.useEffect(() => {
    if (!initialRender) {
      props.onPageChange && props.onPageChange(page);
    } else {
      setInitialRender(false);
    }
  }, [page]);

  React.useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  React.useEffect(() => {
    if (!initialRender) {
      props.onPerPageChange && props.onPerPageChange(perPage);
    } else {
      setInitialRender(false);
    }
  }, [perPage]);

  return (
    <div
      className={`flex  gap-4 align-center ${props.className}`}
      style={{ ...props.style, fontSize: "12px" }}
    >
      <div>Total {total} items</div>
      <PaginagtionStyled>
        <div
          className={`pointer ${page == 1 ? "disabled" : ""}`}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          <Prev />
        </div>
        {page > 1 && count >= 1 && (
          <div
            className="pointer"
            onClick={() => {
              setPage(1);
            }}
          >
            1
          </div>
        )}
        {count > 3 && page > 3 && <More />}
        {page > 2 && (
          <div
            className="pointer"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {page - 1}
          </div>
        )}
        <div className="active">{page}</div>
        {page < count - 1 && (
          <div
            className="pointer"
            onClick={() => {
              if (page < count) {
                setPage(page + 1);
              }
            }}
          >
            {page + 1}
          </div>
        )}
        {count > 3 && page < count - 2 && <More />}
        {page < count && count > 1 && (
          <div
            className="pointer"
            onClick={() => {
              setPage(count);
            }}
          >
            {count}
          </div>
        )}
        <div
          className={`pointer ${page >= count ? "disabled" : ""}`}
          onClick={() => {
            if (page < count) {
              setPage(page + 1);
            }
          }}
        >
          <Next />
        </div>
      </PaginagtionStyled>
      <Select
        value={perPage}
        onChange={(e) => {
          setPerPage(+e.target.value);
        }}
      >
        <option value={5}>5 / page</option>
        <option value={10}>10 / page</option>
        <option value={20}>20 / page</option>
        <option value={50}>50 / page</option>
        <option value={100}>100 / page</option>
      </Select>
      <div className="flex align-center gap-2">
        <span>Go to</span>
        <LazyInput
          type="number"
          min="0"
          max={count || 1}
          step="1"
          value={page}
          onChange={(newValue) => {
            if (newValue > 0 && newValue <= count) {
              setPage(+newValue);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;

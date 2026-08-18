import { css } from 'lit';

export const breadcrumbStyles = css`
  .biz-breadcrumb-nav {
  font-family: sans-serif;
  font-size: 14px;
}

.biz-breadcrumb-list {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.biz-breadcrumb-item {
  display: flex;
  align-items: center;
}

.biz-breadcrumb-item:not(:last-child)::after {
  content: var(--biz-breadcrumb-separator, '/');
  margin: 0 8px;
  color: #767676;
}

.biz-breadcrumb-link {
  color: #1f6fb2;
  text-decoration: none;
}

.biz-breadcrumb-link:hover {
  text-decoration: underline;
}

.biz-breadcrumb-current {
  color: #333;
  font-weight: 600;
}
`;
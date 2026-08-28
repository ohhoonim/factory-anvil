import { css } from "lit";

export const formLabelStyles = css`
/* 1. 기본 라벨 컨테이너 구조 */
.label-container {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--form-label-text-color, #111827);
}

/* 2. CSS-First: 슬롯 내부 요소가 없으면 즉시 hidden */
.label-container:has(slot[name="label-slot"]:empty),
.label-container:has(slot:not([name]):empty) {
  display: none !important;
}

/* 3. Host Attribute 기반 제어 (Controller 연동 시) */
:host(:not([has-label])) .label-container {
  display: none !important;
}

/* 4. Form 루트의 Layout Gap 정리 */
:host(:not([has-label])) .form-control-root {
  gap: 0;
}


`;
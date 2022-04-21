import React, { Children } from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

function Card({ title, children }: Props) {
  return (
    <div className="card">
      <div className="cardHeader">
        <p className="card-header-title">{title}</p>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
}

export { Card };

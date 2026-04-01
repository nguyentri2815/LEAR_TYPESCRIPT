import React from "react";

type Props = {
  title: string;
};

const Title = (props: Props): React.ReactNode => {
  const { title } = props;
  return <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>;
};

export default Title;

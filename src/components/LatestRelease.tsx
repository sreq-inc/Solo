import React from "react";
import { useLatestRelease } from "../hooks/useLatestRelease";

type Props = {
  owner: string;
  repo: string;
  className?: string;
};

export const LatestRelease: React.FC<Props> = ({ owner, repo, className }) => {
  const { release, error, loading } = useLatestRelease(owner, repo);

  if (error) return <div>Erro: {error}</div>;
  if (loading || !release) return <div>Carregando...</div>;

  return <div className={className}>({release.tag})</div>;
};

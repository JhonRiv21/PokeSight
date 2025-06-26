import { useEffect } from 'react';

export function useInfiniteScroll({
  targetRef,
  canLoadMore,
  onLoadMore,
  loading,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  canLoadMore: boolean;
  onLoadMore: () => void;
  loading: boolean;
}) {
  useEffect(() => {
    if (!targetRef.current || !canLoadMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { threshold: 1 }
    );

    const current = targetRef.current;
    observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [targetRef, canLoadMore, loading, onLoadMore]);
}
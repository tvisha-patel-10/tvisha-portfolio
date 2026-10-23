import { useState, useEffect } from 'react';

export type AppRoute = 'story' | 'project-guide' | 'device-check' | 'live-session' | 'review' | 'redo' | 'cleared';

export interface RouteInfo {
  route: AppRoute;
  flagId?: string;
  rawHash: string;
}

export function parseHash(hash: string): RouteInfo {
  const clean = hash.replace(/^#\/?/, '');
  if (!clean || clean === 'story' || clean === 'process') {
    return { route: 'story', rawHash: '#/story' };
  }
  if (clean === 'project-guide') {
    return { route: 'project-guide', rawHash: '#/project-guide' };
  }
  if (clean === 'device-check') {
    return { route: 'device-check', rawHash: '#/device-check' };
  }
  if (clean === 'live-session') {
    return { route: 'live-session', rawHash: '#/live-session' };
  }
  if (clean === 'review') {
    return { route: 'review', rawHash: '#/review' };
  }
  if (clean === 'cleared') {
    return { route: 'cleared', rawHash: '#/cleared' };
  }
  if (clean.startsWith('redo/')) {
    const parts = clean.split('/');
    return { route: 'redo', flagId: parts[1], rawHash: `#/redo/${parts[1] || ''}` };
  }
  return { route: 'story', rawHash: '#/story' };
}

export function useHashRoute(): [RouteInfo, (newHash: string) => void] {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    // If no hash is set on load or #/ or #, default to #/story
    if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#') {
      window.location.hash = '#/story';
    }

    const onHashChange = () => {
      setRouteInfo(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (newHash: string) => {
    window.location.hash = newHash;
  };

  return [routeInfo, navigate];
}

'use client';

import qs from 'query-string';
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from 'next/navigation';
import { Video, VideoOff } from 'lucide-react';

import { ActionTooltip } from '@/components/ActionTooltip';
import { Icon } from '@radix-ui/react-select';

export const ChatVideoButton = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get('video');

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName || '',
        query: { video: isVideo ? undefined : true },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const Icon = isVideo ? VideoOff : Video;
  const toolTipLabel = isVideo ? 'End video' : 'Start video';

  return (
    <ActionTooltip side="bottom" label={toolTipLabel}>
      <button onClick={onClick} className="mr-4 hover:opacity-75 transiton">
        <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};

import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layer, Color } from "@/types/canvas";

// Initialize Liveblocks Client
const client = createClient({
  throttle: 16,
  // publicApiKey:"pk_dev_fYjpBksiHrbfCmxxxGoLYt0O70FSAleG6VwuYjHuc5ZAyelfIc4ifW3DjVWaScj0", // Replace with your API key
  authEndpoint: "/api/liveblocks-auth",
});

type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  penColor: Color | null;
};

type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

// Create Room Context
export const {
  suspense: {
    RoomProvider,
    useOthers,
    useOther,
    useMyPresence,
    useStorage,
    useMutation,
    useSelf,
    useCanRedo,
    useCanUndo,
    useHistory,
    useOthersMapped,
    useOthersConnectionIds,
  },
} = createRoomContext(client);

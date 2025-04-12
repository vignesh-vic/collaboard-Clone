import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Initialize Liveblocks Client
const client = createClient({
  // publicApiKey:"pk_dev_fYjpBksiHrbfCmxxxGoLYt0O70FSAleG6VwuYjHuc5ZAyelfIc4ifW3DjVWaScj0", // Replace with your API key
  authEndpoint: "/api/liveblocks-auth",
});

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
    useMyPresence,
    useStorage,
    useMutation,
    useSelf,
  },
} = createRoomContext(client);

import { useSelf, useMutation } from "@/liveblocks.config";

export const useDeleteLayers = () => {
  const selection = useSelf<any>((me) => me.presence.selection ?? []);

  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers:any = storage.get("layers");
      const liveLayersIds:any = storage.get("layersIds");
      if (!selection || !Array.isArray(selection)) return;

      for (const id of selection) {
        liveLayers?.delete(id);

        const index = liveLayersIds?.indexOf(id);
        if (index !== -1) {
          liveLayersIds?.delete(index);
        }
      }

      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection]
  );
};

"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { getSpotifyNowPlaying, SpotifyData } from "@/lib/spotify";
import { Headphones, MusicNotes } from "./icons";

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  /**
   * Fetch the Spotify data.
   */
  const fetchSpotifyData = useCallback(async () => {
    try {
      const result = await getSpotifyNowPlaying();
      setData(result);
      if (result.track) {
        setCurrentProgress(result.track.progress);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  }, []);

  /**
   * Refresh the Spotify data every 10 seconds.
   */
  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 10000);
    return () => clearInterval(interval);
  }, [fetchSpotifyData]);

  /**
   * Update the progress bar if the track is playing.
   */
  useEffect(() => {
    if (!data?.isPlaying || !data.track) return;

    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        const newProgress = prev + 1000;
        return newProgress >= data.track!.duration ? data.track!.duration : newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.isPlaying, data?.track]);

  /**
   * Helper function to format the time in minutes and seconds.
   *
   * @param ms - The time in milliseconds.
   * @returns The time in minutes and seconds.
   */
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">What I&apos;m Listening To</h2>
      <div className="flex flex-row mt-6 mb-3 gap-6">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
          {data && data.isPlaying && data.track && data.track.albumArt ? (
            <Image
              src={data.track.albumArt}
              alt={`${data.track.album} album cover`}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
              {data?.isPlaying ? <MusicNotes /> : <Headphones />}
            </div>
          )}
        </div>
        {data && data.isPlaying && data.track ? (
          <div className="flex-1">
            <h3 className="text-lg font-semibold line-clamp-1">{data.track.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-1">{data.track.artists}</p>
            <p className="text-muted-foreground text-xs line-clamp-1">{data.track.album}</p>
          </div>
        ) : (
          <div className="flex-1 pt-1">
            <h3 className="text-lg font-semibold">Nothing playing</h3>
            <p className="text-muted-foreground text-sm">
              When I&apos;m listening to music, you&apos;ll see it here.
            </p>
          </div>
        )}
      </div>

      {data && data.isPlaying && data.track && (
        <div className="">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentProgress)}</span>
            <span>{formatTime(data.track.duration)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-muted">
            <div
              className="h-full bg-purple-700 transition-all duration-1000 ease-linear"
              style={{ width: `${(currentProgress / data.track.duration) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

import { Calendar, ExternalLink, ImageIcon, Video } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dayjs } from "@/lib/dayjs";

import type { APODSummaryResponse, APODResponse } from "@/schema/apod.schema";

export default function APODGallery({ apodEntries }: { apodEntries: APODSummaryResponse }) {
  const [selectedEntry, setSelectedEntry] = useState<APODResponse | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 pb-8">
        {apodEntries?.entries.map((apodEntry) => (
          <Card
            key={apodEntry.date}
            className="relative w-full pt-0 transition-all cursor-pointer hover:scale-[1.02]  hover:shadow-lg"
            onClick={() => setSelectedEntry(apodEntry)}
          >
            <div className="relative aspect-video bg-muted">
              <Badge
                variant="secondary"
                className="absolute top-4 right-2 backdrop-blur-sm capitalize z-50"
              >
                {apodEntry.media_type === "image" ? (
                  <ImageIcon className="h-3 w-3 mr-1" />
                ) : (
                  <Video className="h-3 w-3 mr-1" />
                )}
                {apodEntry.media_type}
              </Badge>
              {apodEntry.media_type === "image" ? (
                <div className="grid group">
                  <img
                    src={apodEntry.url}
                    alt={apodEntry.title}
                    className="[grid-area:1/1] relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                    loading="lazy"
                  />
                  <img
                    src={apodEntry.url}
                    alt={apodEntry.title}
                    className="[grid-area:1/1] [clip-path:circle(0)] transition-[clip-path] duration-300 group-hover:[clip-path:circle(100%)] relative z-30 aspect-video w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardContent className="p-4 relative">
              <h3 className="font-semibold text-sm line-clamp-1 mb-1">{apodEntry.title}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {dayjs(apodEntry.date).format("ll")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-100 md:max-w-md max-h-[90vh] overflow-y-auto">
          {selectedEntry && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEntry.title}</DialogTitle>
                <DialogDescription asChild>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {dayjs(selectedEntry.date).format("dddd, MMMM D, YYYY")}
                    {selectedEntry.copyright && (
                      <span className="text-muted-foreground">
                        &copy; {selectedEntry.copyright}
                      </span>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                {selectedEntry.media_type === "image" ? (
                  <div className="relative aspect-video overflow-hidden rounded">
                    <img
                      src={selectedEntry.url}
                      alt={selectedEntry.title}
                      className="object-contain bg-black"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video overflow-hidden rounded">
                    <iframe
                      src={selectedEntry.url}
                      title={selectedEntry.title}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {selectedEntry.explanation}
                </p>
                {selectedEntry.hdurl && (
                  <Button variant="outline" className="mt-4" asChild>
                    <a href={selectedEntry.hdurl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View HD Image
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 text-muted-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 text-center text-sm">
        Flamingo Revolution — {new Date().getFullYear()}
      </div>
    </footer>
  );
}

import { AnimatedTitle } from "../components/AnimatedTitle";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative p-4 sm:p-8 md:p-24 bg-background text-foreground">
      <div className="mb-8">
        <AnimatedTitle />
      </div>
      <SearchForm />
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Created by{" "}
        <a
          href="https://jollycod.ing/x"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-muted-foreground/80"
        >
          JollyCoding
        </a>
      </footer>
    </main>
  );
}

export interface ComponentProps {
  result:
    | "wait for search"
    | "no results"
    | Array<{
        id: string;
        name: string;
        image: string;
      }>;
}

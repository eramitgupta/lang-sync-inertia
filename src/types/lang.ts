export type Replaces = Record<string, string | number>;

export type LangValue =
    | string
    | {
          [key: string]: string | LangValue;
      };

export type LangObject = Record<string, LangValue>;

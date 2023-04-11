import { generateRandomString } from "./generateRandomString";

interface IItem {
  value: string;
  id: string;
  onClick: (id: string) => void;
}

interface IMyListProps {
  list: IItem[];
}

export function MyList({ list }: IMyListProps) {
  return (
    <ul>
      {list.map((item) => (
        <li onClick={() => item.onClick(item.id)} key={item.id}>
          {item.value}
        </li>
      ))}
    </ul>
  );
}

export interface IGItem {
  id?: string;
  text: string;
  onClick?: (text: string) => void;
  className?: string;
  As?: "a" | "li" | "button" | "div";
  href?: string;
}

export interface IGenericListProps {
  list: IGItem[];
}

export function GenericList({ list }: IGenericListProps, hidden: boolean) {
  return (
    <>
      {list.map(
        ({
          As = "li",
          text,
          onClick = (text) => {},
          className,
          id = generateRandomString(),
          href,
        }) => (
          <As
            className={className}
            onClick={() => onClick(text)}
            key={id}
            href={href}
          >
            {text}
          </As>
        )
      )}
    </>
  );
}

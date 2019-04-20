import { CompareFunc } from '../lib/comparators';

export type SortFunc<T> = (sortable: T[]) => T[];
export type CreateSorterFunc<T, O> = (compare: CompareFunc<T>, Options: O) => SortFunc<T>;

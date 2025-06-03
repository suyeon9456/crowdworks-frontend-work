export type Label =
  | 'unspecified'
  | 'list'
  | 'page_header'
  | 'section_header'
  | 'list_item'
  | 'text'
  | 'picture'
  | 'table';
export interface JsonData {
  schema_name: string;
  version: string;
  name: string;
  origin: {
    mimetype: string;
    binary_hash: number;
    filename: string;
  };
  body: Body;
  form_items: [];
  furniture: {
    self_ref: '#/furniture';
    children: Array<{ $ref: string }>;
    content_layer: 'furniture';
    name: string;
    label: Label;
  };
  groups: {
    content_layer: 'body';
    label: Label;
    name: string;
    parent: { $ref: string };
    self_ref: string;
    children: Array<{ $ref: string }>;
  }[];
  texts: Array<Text>;
  pictures: Array<Picture>;
  tables: Array<Table>;
  key_value_items: [];
  pages: Array<{ image: Image; page_no: number; size: { width: number; height: number } }>;
}

export interface Body {
  self_ref: '#/body';
  children: Array<{ $ref: string }>;
  content_layer: 'body';
  name: string;
  label: Label;
}

export interface Table {
  self_ref: string;
  parent: { $ref: string };
  children: Array<{ $ref: string }>;
  content_layer: string;
  label: Label;
  prov: Array<Prov>;
  captions: [];
  footnotes: [];
  references: [];
  data: {
    table_cells: Array<TableCell>;
    num_rows: number;
    num_cols: number;
    grid: Array<Array<TableCell>>;
  };
}

export interface TableCell {
  bbox: {
    l: number;
    t: number;
    r: number;
    b: number;
    coord_origin: string;
  };
  row_span: number;
  col_span: number;
  start_row_offset_idx: number;
  end_row_offset_idx: number;
  start_col_offset_idx: number;
  end_col_offset_idx: number;
  text: string;
  column_header: boolean;
  row_header: boolean;
  row_section: boolean;
}

export interface Text {
  self_ref: string;
  parent: { $ref: string };
  children: Array<{ $ref: string }>;
  content_layer: string;
  label: Label;
  prov: Array<Prov>;
  orig: string;
  text: string;
}

export interface Picture {
  self_ref: string;
  parent: { $ref: string };
  children: Array<{ $ref: string }>;
  content_layer: string;
  prov: Array<Prov>;
  annotations: [];
  captions: [];
  footnotes: [];
  image: Image;
  label: Label;
  references: [];
}

export interface Prov {
  page_no: number;
  bbox: Array<{ b: number; coord_origin: string; l: number; r: number; t: number }>;
  charspan: Array<number>;
}

export interface Image {
  dpi: number;
  mimetype: string;
  size: { width: number; height: number };
  uri: string;
}

export interface TextItem {
  self_ref: string;
  text: string;
  parent?: {
    $ref: string;
  };
}

export interface GroupItem {
  self_ref: string;
  label: string;
  children?: { $ref: string }[];
}

export type JsonElement = Text | Picture | Table | GroupItem | Body;

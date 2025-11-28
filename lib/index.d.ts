/// <reference types="node" />

import { Stream } from 'stream';

export interface BorderOptions {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface HeaderFooterConfig {
  height?: string;
  contents?: string | {
    first?: string;
    last?: string;
    default?: string;
    [page: number]: string;
  };
}

export interface CookieOptions {
  name: string;
  value: string;
  domain?: string;
  path: string;
  httponly?: boolean;
  secure?: boolean;
  expires?: number;
}

export interface CreateOptions {
  // Export options
  directory?: string;
  
  // Papersize options
  height?: string;
  width?: string;
  format?: 'A3' | 'A4' | 'A5' | 'Legal' | 'Letter' | 'Tabloid';
  orientation?: 'portrait' | 'landscape';
  
  // Page options
  border?: string | BorderOptions;
  
  // Header and footer
  header?: HeaderFooterConfig;
  footer?: HeaderFooterConfig;
  
  // Rendering options
  base?: string;
  zoomFactor?: string | number;
  
  // Puppeteer options
  printBackground?: boolean;
  preferCSSPageSize?: boolean;
  
  // Script options
  puppeteerArgs?: string[];
  headless?: boolean;
  timeout?: number;
  renderDelay?: number | 'manual';
  
  // HTTP Headers and Cookies
  httpHeaders?: Record<string, string>;
  httpCookies?: CookieOptions[];
}

export interface FileResult {
  filename: string;
}

export class PDFDocument {
  constructor(html: string, options?: CreateOptions);
  
  toBuffer(callback?: (err: Error | null, buffer?: Buffer) => void): Promise<Buffer>;
  toFile(callback: (err: Error | null, result?: FileResult) => void): Promise<FileResult>;
  toFile(filename: string, callback?: (err: Error | null, result?: FileResult) => void): Promise<FileResult>;
  toStream(callback?: (err: Error | null, stream?: Stream) => void): Promise<Stream>;
}

export function create(
  html: string,
  callback: (err: Error | null, buffer?: Buffer) => void
): void;

export function create(
  html: string,
  options: CreateOptions,
  callback: (err: Error | null, buffer?: Buffer) => void
): void;

export function create(
  html: string,
  options?: CreateOptions
): PDFDocument;

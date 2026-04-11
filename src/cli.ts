#!/usr/bin/env node
/**
 * CLI utility for parsing COMPACT format files to JSON
 * 
 * Usage:
 *   compact-parse input.txt                    # Output to stdout
 *   compact-parse input.txt -o output.json    # Output to file
 *   compact-parse input.txt --pretty          # Pretty print JSON
 *   cat input.txt | compact-parse             # Read from stdin
 */

import { readFileSync, writeFileSync } from 'fs';
import { parseCompact } from './index.js';

function printUsage(): void {
  console.log(`
compact-parse - Parse COMPACT format to JSON

Usage:
  compact-parse <input.txt> [options]
  cat <input.txt> | compact-parse [options]

Options:
  -o, --output <file>   Write output to file instead of stdout
  -p, --pretty          Pretty print JSON (default: minified)
  -h, --help            Show this help message

Examples:
  compact-parse workout.txt
  compact-parse workout.txt -o workout.json -p
  cat diary.txt | compact-parse --pretty
`);
}

function main(): void {
  const args = process.argv.slice(2);
  
  let inputFile: string | null = null;
  let outputFile: string | null = null;
  let pretty = false;
  
  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-h' || arg === '--help') {
      printUsage();
      process.exit(0);
    } else if (arg === '-o' || arg === '--output') {
      outputFile = args[++i];
      if (!outputFile) {
        console.error('Error: -o/--output requires a filename');
        process.exit(1);
      }
    } else if (arg === '-p' || arg === '--pretty') {
      pretty = true;
    } else if (!arg.startsWith('-')) {
      inputFile = arg;
    } else {
      console.error(`Unknown option: ${arg}`);
      printUsage();
      process.exit(1);
    }
  }
  
  // Read input
  let input: string;
  
  if (inputFile) {
    try {
      input = readFileSync(inputFile, 'utf-8');
    } catch (err) {
      console.error(`Error reading file: ${inputFile}`);
      console.error((err as Error).message);
      process.exit(1);
    }
  } else if (!process.stdin.isTTY) {
    // Read from stdin
    input = readFileSync(0, 'utf-8'); // fd 0 = stdin
  } else {
    console.error('Error: No input file specified and no stdin data');
    printUsage();
    process.exit(1);
  }
  
  // Parse
  const result = parseCompact(input);
  
  if (!result.success) {
    console.error('Parse error:', result.error.message);
    if (result.error.location) {
      console.error(`  at line ${result.error.location.start.line}, column ${result.error.location.start.column}`);
    }
    process.exit(1);
  }
  
  // Format output
  const jsonOutput = pretty 
    ? JSON.stringify(result.document, null, 2)
    : JSON.stringify(result.document);
  
  // Write output
  if (outputFile) {
    try {
      writeFileSync(outputFile, jsonOutput, 'utf-8');
      console.error(`Written to ${outputFile}`);
    } catch (err) {
      console.error(`Error writing file: ${outputFile}`);
      console.error((err as Error).message);
      process.exit(1);
    }
  } else {
    console.log(jsonOutput);
  }
}

main();

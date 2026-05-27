import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseCompact } from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONSTER_PATH = join(__dirname, '../MONSTER.compact');
const SNAPSHOT_PATH = join(__dirname, 'snapshots/monster.json');

describe('MONSTER.compact comprehensive test', () => {
  it('should parse MONSTER.compact successfully', () => {
    const input = readFileSync(MONSTER_PATH, 'utf-8');
    const result = parseCompact(input);
    
    if (!result.success) {
      console.log('Parse error:', result.error.message);
      console.log('Location:', JSON.stringify(result.error.location, null, 2));
    }
    
    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error(`Parse failed: ${result.error.message}`);
    }
    
    // Should have multiple workouts
    expect(result.document.workouts.length).toBeGreaterThan(5);
    
    // Find workout with Derived items (workout with id 'w001')
    const workoutWithDerived = result.document.workouts.find(
      (w) => Array.isArray(w.content) && w.content.some((c) => c.type === 'derived'),
    );
    expect(workoutWithDerived).toBeDefined();
    
    const derivedItems = workoutWithDerived!.content.filter(c => c.type === 'derived');
    expect(derivedItems.length).toBeGreaterThan(0);
  });
  
  it('should parse all Derived fields correctly', () => {
    const input = readFileSync(MONSTER_PATH, 'utf-8');
    const result = parseCompact(input);
    
    expect(result.success).toBe(true);
    if (!result.success) return;
    
    // Find workout with Derived items
    const workoutWithDerived = result.document.workouts.find(
      (w) => Array.isArray(w.content) && w.content.some((c) => c.type === 'derived'),
    );
    expect(workoutWithDerived).toBeDefined();
    
    const derivedItems = workoutWithDerived!.content.filter(c => c.type === 'derived');
    
    // Check we have strength, endurance, and nutrition derived values
    // The derived type uses 'name' field for the feature ID
    const featureIds = derivedItems.map((d: { name?: string }) => d.name);
    
    expect(featureIds).toContain('strength.neural_stress');
    expect(featureIds).toContain('strength.power_emphasis');
    expect(featureIds).toContain('strength.hypertrophy_emphasis');
    expect(featureIds).toContain('endurance.zone2_minutes');
    expect(featureIds).toContain('nutrition.sugar_simple');
    expect(featureIds).toContain('nutrition.fat_good_total');
  });
  
  it('should match or update snapshot', () => {
    const input = readFileSync(MONSTER_PATH, 'utf-8');
    const result = parseCompact(input);
    
    expect(result.success).toBe(true);
    if (!result.success) return;
    
    const currentJson = JSON.stringify(result.document, null, 2);
    
    // If UPDATE_SNAPSHOTS env var is set, update the snapshot
    if (process.env.UPDATE_SNAPSHOTS) {
      writeFileSync(SNAPSHOT_PATH, currentJson, 'utf-8');
      console.log(`Snapshot updated: ${SNAPSHOT_PATH}`);
      return;
    }
    
    // Compare with existing snapshot if it exists
    if (existsSync(SNAPSHOT_PATH)) {
      const existingJson = readFileSync(SNAPSHOT_PATH, 'utf-8');
      expect(currentJson).toBe(existingJson);
    } else {
      // No snapshot exists, create it
      writeFileSync(SNAPSHOT_PATH, currentJson, 'utf-8');
      console.log(`Snapshot created: ${SNAPSHOT_PATH}`);
    }
  });
});

import { afterEach, beforeEach } from 'vitest';
import { profile } from '@/data/portfolio';

/** Temporarily configures a resume URL for the tests in the current describe block. */
export function withResume(url = '/resume/test.pdf') {
  const original = profile.resumeUrl;
  beforeEach(() => {
    profile.resumeUrl = url;
  });
  afterEach(() => {
    profile.resumeUrl = original;
  });
}

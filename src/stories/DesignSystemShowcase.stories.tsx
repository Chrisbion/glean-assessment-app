import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/shared/components/Button';
import styles from './DesignSystemShowcase.module.css';

const semanticColors = [
  ['Brand', 'var(--color-brand)'],
  ['Brand Hover', 'var(--color-brand-hover)'],
  ['Brand Active', 'var(--color-brand-active)'],
  ['Brand Subtle', 'var(--color-brand-subtle)'],
  ['Surface', 'var(--color-bg-surface)'],
  ['Surface Raised', 'var(--color-bg-surface-raised)'],
  ['Subtle Bg', 'var(--color-bg-subtle)'],
  ['Danger', 'var(--color-danger)'],
  ['Success', 'var(--color-success)'],
  ['Warning', 'var(--color-warning)'],
] as const;

const primitivePalettes = [
  {
    name: 'Neutral',
    colors: [
      ['neutral-0', 'var(--color-neutral-0)'],
      ['neutral-50', 'var(--color-neutral-50)'],
      ['neutral-100', 'var(--color-neutral-100)'],
      ['neutral-200', 'var(--color-neutral-200)'],
      ['neutral-300', 'var(--color-neutral-300)'],
      ['neutral-400', 'var(--color-neutral-400)'],
      ['neutral-500', 'var(--color-neutral-500)'],
      ['neutral-600', 'var(--color-neutral-600)'],
      ['neutral-700', 'var(--color-neutral-700)'],
      ['neutral-800', 'var(--color-neutral-800)'],
      ['neutral-900', 'var(--color-neutral-900)'],
      ['neutral-950', 'var(--color-neutral-950)'],
    ],
  },
  {
    name: 'Blue',
    colors: [
      ['blue-50', 'var(--color-blue-50)'],
      ['blue-100', 'var(--color-blue-100)'],
      ['blue-200', 'var(--color-blue-200)'],
      ['blue-300', 'var(--color-blue-300)'],
      ['blue-400', 'var(--color-blue-400)'],
      ['blue-500', 'var(--color-blue-500)'],
      ['blue-600', 'var(--color-blue-600)'],
      ['blue-700', 'var(--color-blue-700)'],
      ['blue-800', 'var(--color-blue-800)'],
    ],
  },
  {
    name: 'Red',
    colors: [
      ['red-50', 'var(--color-red-50)'],
      ['red-100', 'var(--color-red-100)'],
      ['red-200', 'var(--color-red-200)'],
      ['red-500', 'var(--color-red-500)'],
      ['red-600', 'var(--color-red-600)'],
      ['red-700', 'var(--color-red-700)'],
    ],
  },
  {
    name: 'Green',
    colors: [
      ['green-50', 'var(--color-green-50)'],
      ['green-100', 'var(--color-green-100)'],
      ['green-200', 'var(--color-green-200)'],
      ['green-500', 'var(--color-green-500)'],
      ['green-600', 'var(--color-green-600)'],
      ['green-700', 'var(--color-green-700)'],
    ],
  },
  {
    name: 'Amber',
    colors: [
      ['amber-50', 'var(--color-amber-50)'],
      ['amber-100', 'var(--color-amber-100)'],
      ['amber-200', 'var(--color-amber-200)'],
      ['amber-500', 'var(--color-amber-500)'],
      ['amber-600', 'var(--color-amber-600)'],
      ['amber-700', 'var(--color-amber-700)'],
    ],
  },
] as const;

const typeTokens = [
  [
    'Heading Display',
    'var(--text-heading-display)',
    'var(--font-heading)',
    'var(--font-weight-strong)',
    'var(--leading-heading)',
    'var(--tracking-heading)',
  ],
  [
    'Heading Large',
    'var(--text-heading-lg)',
    'var(--font-heading)',
    'var(--font-weight-heading)',
    'var(--leading-heading)',
    'var(--tracking-heading)',
  ],
  [
    'Heading Medium',
    'var(--text-heading-md)',
    'var(--font-heading)',
    'var(--font-weight-heading)',
    'var(--leading-heading)',
    'var(--tracking-heading)',
  ],
  [
    'Body Large',
    'var(--text-body-lg)',
    'var(--font-body)',
    'var(--font-weight-body)',
    'var(--leading-body)',
    'var(--tracking-body)',
  ],
  [
    'Body Medium',
    'var(--text-body-md)',
    'var(--font-body)',
    'var(--font-weight-body)',
    'var(--leading-body)',
    'var(--tracking-body)',
  ],
  [
    'Label',
    'var(--text-label)',
    'var(--font-label)',
    'var(--font-weight-label)',
    'var(--leading-body)',
    'var(--tracking-label)',
  ],
  [
    'Caption',
    'var(--text-caption)',
    'var(--font-body)',
    'var(--font-weight-body)',
    'var(--leading-caption)',
    'var(--tracking-body)',
  ],
  [
    'Code',
    'var(--text-code)',
    'var(--font-code)',
    'var(--font-weight-body)',
    'var(--leading-body)',
    'var(--tracking-body)',
  ],
] as const;

const spacingTokens = [
  ['space-1', 'var(--space-1)'],
  ['space-2', 'var(--space-2)'],
  ['space-3', 'var(--space-3)'],
  ['space-4', 'var(--space-4)'],
  ['space-6', 'var(--space-6)'],
  ['space-8', 'var(--space-8)'],
  ['space-10', 'var(--space-10)'],
  ['space-16', 'var(--space-16)'],
] as const;

const radii = [
  ['sm', 'var(--radius-sm)'],
  ['md', 'var(--radius-md)'],
  ['xl', 'var(--radius-xl)'],
  ['2xl', 'var(--radius-2xl)'],
  ['full', 'var(--radius-full)'],
] as const;

const shadows = [
  ['sm', 'var(--shadow-sm)'],
  ['md', 'var(--shadow-md)'],
  ['lg', 'var(--shadow-lg)'],
  ['xl', 'var(--shadow-xl)'],
] as const;

function DesignSystemShowcase() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Glean Assessment App</div>
        <h1 className={styles.heroTitle}>Design system foundations</h1>
        <p className={styles.heroBody}>
          A live overview of your token architecture, semantic typography, surfaces, and shared
          component styles.
        </p>
        <div className={styles.buttonRow}>
          <Button variant="primary">Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="destructive">Destructive action</Button>
        </div>
      </section>

      <div className={styles.twoColumn}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Semantic color tokens</h2>
            <p className={styles.sectionBody}>
              Components should consume meaning-based colors rather than raw palette values. Use{' '}
              <span className={styles.inlineCode}>var(--color-token-name)</span>.
            </p>
          </div>
          <div className={styles.panel}>
            <div className={styles.tokenGrid}>
              {semanticColors.map(([label, value]) => (
                <div className={styles.swatch} key={label}>
                  <div className={styles.swatchChip} style={{ background: value }} />
                  <div className={styles.swatchName}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Primitive color palette</h2>
            <p className={styles.sectionBody}>
              Raw palette tokens live here so semantic tokens can map to them without components
              depending on palette names directly. Use{' '}
              <span className={styles.inlineCode}>var(--color-palette-shade)</span>.
            </p>
          </div>
          <div className={styles.panel}>
            <div className={styles.paletteStack}>
              {primitivePalettes.map((palette) => (
                <div className={styles.paletteGroup} key={palette.name}>
                  <h3 className={styles.paletteTitle}>{palette.name}</h3>
                  <div className={styles.paletteGrid}>
                    {palette.colors.map(([label, value]) => (
                      <div className={styles.paletteSwatch} key={label}>
                        <div className={styles.paletteChip} style={{ background: value }} />
                        <div className={styles.paletteName}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className={styles.twoColumn}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Semantic typography</h2>
            <p className={styles.sectionBody}>
              Text roles are mapped to primitives so you can scale the system without rewriting
              components.
            </p>
          </div>
          <div className={styles.panel}>
            <div className={styles.typeStack}>
              {typeTokens.map(([label, size, family, weight, lineHeight, letterSpacing]) => (
                <div className={styles.typeRow} key={label}>
                  <div className={styles.typeLabel}>{label}</div>
                  <div
                    style={{
                      fontSize: size,
                      fontFamily: family,
                      fontWeight: weight,
                      lineHeight,
                      letterSpacing,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Spacing scale</h2>
            <p className={styles.sectionBody}>
              A compact spacing preview to help keep layouts rhythm-based instead of one-off.
            </p>
          </div>
          <div className={styles.panel}>
            <div className={styles.measureGrid}>
              {spacingTokens.map(([label, value]) => (
                <div className={styles.measureRow} key={label}>
                  <div className={styles.measureLabel}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className={styles.measureBar} style={{ width: value }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Radius and shadow</h2>
            <p className={styles.sectionBody}>
              Foundation tokens for surfaces, controls, and depth.
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.panel}>
              <div className={styles.tokenGrid}>
                {radii.map(([label, value]) => (
                  <div className={styles.swatch} key={label}>
                    <div
                      className={styles.swatchChip}
                      style={{
                        background: 'var(--color-brand-subtle)',
                        borderRadius: value,
                      }}
                    />
                    <div className={styles.swatchName}>radius-{label}</div>
                    <div className={styles.swatchValue}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.tokenGrid}>
                {shadows.map(([label, value]) => (
                  <div className={styles.swatch} key={label}>
                    <div
                      className={styles.swatchChip}
                      style={{
                        background: 'var(--color-bg-surface)',
                        boxShadow: value,
                      }}
                    />
                    <div className={styles.swatchName}>shadow-{label}</div>
                    <div className={styles.swatchValue}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Surface recipes</h2>
          <p className={styles.sectionBody}>
            A quick preview of common semantic surface combinations in light and dark contexts.
          </p>
        </div>
        <div className={styles.surfaceGrid}>
          <article className={styles.surfaceCard} style={{ background: 'var(--color-bg-surface)' }}>
            <div className={styles.surfaceTitle}>Default surface</div>
            <p className={styles.surfaceBody}>
              Uses surface, default border, and primary text tokens.
            </p>
            <Button size="sm" variant="secondary">
              Inspect
            </Button>
          </article>

          <article
            className={styles.surfaceCard}
            style={{
              background: 'var(--color-brand-subtle)',
              borderColor: 'var(--color-border-brand)',
            }}
          >
            <div className={styles.surfaceTitle}>Brand surface</div>
            <p className={styles.surfaceBody}>Good for highlights, callouts, or selected states.</p>
            <Button size="sm" variant="primary">
              Continue
            </Button>
          </article>

          <article
            className={styles.surfaceCard}
            style={{
              background: 'var(--color-danger-subtle)',
              borderColor: 'var(--color-danger-outline)',
            }}
          >
            <div className={styles.surfaceTitle}>Danger surface</div>
            <p className={styles.surfaceBody}>
              Useful for destructive confirmations or error notices.
            </p>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Theme preview</h2>
          <p className={styles.sectionBody}>
            Dark mode overrides semantic tokens only, so components stay consistent.
          </p>
        </div>
        <div className={styles.twoColumn}>
          <div className={styles.themePreview}>
            <div className={styles.themeLabel}>Default theme</div>
            <div className={styles.surfaceCard} style={{ background: 'var(--color-bg-surface)' }}>
              <div className={styles.surfaceTitle}>Semantic tokens in light mode</div>
              <p className={styles.surfaceBody}>
                Text, borders, and surfaces resolve through the same semantic names.
              </p>
              <Button size="sm" variant="primary">
                Open panel
              </Button>
            </div>
          </div>

          <div className={styles.themePreview} data-theme="dark">
            <div className={styles.themeLabel}>[data-theme='dark']</div>
            <div className={styles.surfaceCard} style={{ background: 'var(--color-bg-surface)' }}>
              <div className={styles.surfaceTitle}>Semantic tokens in dark mode</div>
              <p className={styles.surfaceBody}>
                Only the semantic layer changes, not the raw primitives below it.
              </p>
              <Button size="sm" variant="primary">
                Open panel
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Design System/Foundations',
  component: DesignSystemShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DesignSystemShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

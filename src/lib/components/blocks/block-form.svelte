<script lang="ts">
  import { enhance } from '$app/forms'
  import type { ResolvedBlock } from '$lib/directus/pages'

  type Props = {
    block: Extract<ResolvedBlock, { type: 'block_form' }>
  }

  let { block }: Props = $props()

  let submitted = $state(false)
  let error = $state<string | null>(null)

  function widthClass(width: string): string {
    switch (width) {
      case '33':
        return 'col col--4of12 col--mobile--12of12'
      case '50':
        return 'col col--6of12 col--mobile--12of12'
      case '67':
        return 'col col--8of12 col--mobile--12of12'
      default:
        return 'col col--12of12'
    }
  }
</script>

<section class="block block-form padded {block.background}">
  {#if block.tagline}
    <p class="tagline">{block.tagline}</p>
  {/if}

  {#if block.headline}
    <h2 class="h2">{block.headline}</h2>
  {/if}

  {#if submitted}
    <p class="success">
      {block.form.successMessage ?? 'Thank you for your submission.'}
    </p>
  {:else}
    <form
      class="form flex flex--gapped"
      method="POST"
      action="/api/forms/{block.form.id}"
      use:enhance={() => {
        return async ({ result }) => {
          if (result.type === 'success') {
            submitted = true
            error = null

            if (block.form.onSuccess === 'redirect' && block.form.successRedirectUrl) {
              window.location.href = block.form.successRedirectUrl
            }
          } else if (result.type === 'failure') {
            error = (result.data?.error as string) ?? 'Something went wrong.'
          }
        }
      }}
    >
      {#each block.form.fields as field (field.id)}
        <div class={widthClass(field.width)}>
          {#if field.type === 'hidden'}
            <input type="hidden" name={field.name} value="" />
          {:else if field.type === 'textarea'}
            <label for={field.id}>{field.label}</label>
            <textarea
              id={field.id}
              name={field.name}
              placeholder={field.placeholder ?? undefined}
              required={field.required}
            ></textarea>
          {:else if field.type === 'select'}
            <label for={field.id}>{field.label}</label>
            <select id={field.id} name={field.name} required={field.required}>
              <option value="" disabled selected hidden>Select…</option>
              {#each field.choices as choice (choice.value)}
                <option value={choice.value}>{choice.text}</option>
              {/each}
            </select>
          {:else if field.type === 'checkbox'}
            <label>
              <input type="checkbox" name={field.name} value="true" required={field.required} />
              {field.label}
            </label>
          {:else}
            <label for={field.id}>{field.label}</label>
            <input
              id={field.id}
              type={field.type === 'email' ? 'email' : 'text'}
              name={field.name}
              placeholder={field.placeholder ?? undefined}
              required={field.required}
            />
          {/if}

          {#if field.help}
            <small class="help">{field.help}</small>
          {/if}
        </div>
      {/each}

      {#if error}
        <p class="error col col--12of12">{error}</p>
      {/if}

      <div class="col col--12of12">
        <button type="submit">{block.form.submitLabel}</button>
      </div>
    </form>
  {/if}
</section>

<style lang="scss">
  .block-form {
    &.dark {
      color: $blanc;
      background: $noir;
    }
  }

  .tagline {
    font-size: $s-1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: $s-2;
  }

  .form {
    margin-top: $s1;
    max-width: $max;
  }

  label {
    display: block;
    margin-bottom: $s-3;
  }

  .help {
    display: block;
    margin-top: $s-3;
    opacity: 0.7;
  }

  .success {
    margin-top: $s1;
    font-size: $s1;
  }

  .error {
    color: $rouge;
  }
</style>

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !pathHasExtension(specifier)) {
    try {
      return await nextResolve(`${specifier}.ts`, context);
    } catch {
      // fall through to the original specifier
    }
  }
  return nextResolve(specifier, context);
}

function pathHasExtension(specifier) {
  return /\.[a-z0-9]+$/i.test(specifier);
}

"""
Hooks for drf-spectacular to customize OpenAPI schema generation.
"""
from drf_spectacular.utils import extend_schema


def preprocessing_filter_hook(endpoints, request, public, info, **kwargs):
    """
    Customize which endpoints are included in the schema.
    This can filter out internal endpoints if needed.
    """
    # Example: exclude admin paths
    filtered_endpoints = []
    for path, path_regex, method, view in endpoints:
        if "/admin/" in path:
            continue
        filtered_endpoints.append((path, path_regex, method, view))
    
    return filtered_endpoints

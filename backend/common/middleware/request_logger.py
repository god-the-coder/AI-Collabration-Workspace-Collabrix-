import time


class RequestLoggingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        start_time = time.time()

        print("=" * 50)
        print(f"REQUEST STARTED")
        print(f"METHOD: {request.method}")
        print(f"PATH: {request.path}")

        response = self.get_response(request)

        duration = time.time() - start_time

        print(f"REQUEST COMPLETED")
        print(f"TIME TAKEN: {duration:.4f} seconds")
        print("=" * 50)

        return response
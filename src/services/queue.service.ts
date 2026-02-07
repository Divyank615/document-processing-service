type Task = () => Promise<void>;

export class QueueService {
  private queue: Task[] = [];
  private processing = false;
  private maxConcurrent = 2;
  private running = 0;

  async add(task: Task): Promise<void> {
    this.queue.push(task);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0 && this.running < this.maxConcurrent) {
      const task = this.queue.shift();
      if (!task) continue;

      this.running++;

      task()
        .catch(() => {
        })
        .finally(() => {
          this.running--;
          this.processing = false;
          this.processQueue();
        });
    }

    this.processing = false;
  }
}

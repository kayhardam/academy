<script lang="ts">
    import Court from '@coachboard/components/board/Court.svelte';
    import type { Board } from '@coachboard/lib/board/format';

    interface Props {
        board: Board;
        /** The step to draw, counting from 0. */
        step?: number;
        label: string;
    }

    let { board, step = 0, label }: Props = $props();
</script>

<Court {board} frame={step} {label} />

<nav class="position-fixed top-0 start-0 end-0 bg-black w-100 d-flex justify-content-between">
    <div class="d-flex">
        <strong class="d-block p-4 bg-primary text-white">Safe Triangles Demo</strong>
        <ul class="list-unstyled mb-0 d-flex">
            <?php for ($l1 = 1; $l1 <= 7; $l1++) { ?>
                <li class="nav-l1__item">
                    <a class="nav-l1__item-link d-block p-4 <?php echo !empty($class) ? $class . '--js' : '' ?>" href="#<?php echo $l1 ?>" data-safe-triangle-dropdown="dd_<?php echo !empty($class) ? $class : '' ?>_<?php echo $l1 ?>">
                        Item <?php echo $l1 ?>
                    </a>
                    <div class="nav-l1__dropdown position-fixed start-0 end-0 bg-light p-4" data-safe-triangle-dropdown="dd_<?php echo !empty($class) ? $class : '' ?>_<?php echo $l1 ?>">
                        <div class="row">
                            <?php for ($r = 1; $r <= 4; $r++) { ?>
                                <div class="col-md-3">
                                    <a class="nav-l2__item-link d-block fw-bold p-4 border-bottom border-primary" href="#<?php echo $r ?>">
                                        Item <?php echo $l1 . '.' . $r ?>
                                    </a>
                                    <ul class="list-unstyled mb-0">
                                        <?php for ($l2 = 1; $l2 <= 5; $l2++) { ?>
                                            <li class="nav-l2__item <?php echo !empty($class) ? $class . '--js' : '' ?>">
                                                <a class="nav-l2__item-link d-block p-4" href="#<?php echo $l2 ?>">
                                                    Item <?php echo $l1 . '.' . $r . '.' . $l2 ?>
                                                </a>
                                            </li>
                                        <?php } ?>
                                    </ul>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </li>
            <?php } ?>
        </ul>
    </div>

    <div>
        <ul class="list-unstyled mb-0 d-flex">
            <li class="nav-l1__item">
                <a class="nav-l1__item-link d-block p-4<?php echo ($demo == 1) ? ' bg-primary text-white' : '' ?>" href="/demo/demo1.php">Without Safe-Triangles</a>
            </li>
            <li class="nav-l1__item">
                <a class="nav-l1__item-link d-block p-4<?php echo ($demo == 2) ? ' bg-primary text-white' : '' ?>" href="/demo">With Safe-Triangles ( debug: true )</a>
            </li>
            <li class="nav-l1__item">
                <a class="nav-l1__item-link d-block p-4<?php echo ($demo == 3) ? ' bg-primary text-white' : '' ?>" href="/demo/demo3.php">With Safe-Triangles ( debug: false )</a>
            </li>
        </ul>
    </div>
</nav>
